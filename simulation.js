(function () {
    const buttons = Array.from(document.querySelectorAll("[data-service-tab]"));
    const panels = Array.from(document.querySelectorAll("[data-service-panel]"));
    if (!buttons.length || !panels.length) return;

    const activate = (tabName) => {
        const targetExists = panels.some((panel) => panel.dataset.servicePanel === tabName);
        if (!targetExists) return;

        buttons.forEach((button) => {
            const active = button.dataset.serviceTab === tabName;
            button.classList.toggle("active", active);
            button.setAttribute("aria-selected", active ? "true" : "false");
        });

        panels.forEach((panel) => {
            const active = panel.dataset.servicePanel === tabName;
            panel.classList.toggle("active", active);
            panel.hidden = !active;
        });
    };

    buttons.forEach((button) => {
        button.addEventListener("click", () => activate(button.dataset.serviceTab));
    });
})();

(function () {
    const form = document.getElementById("simulation-request-form");
    const status = document.getElementById("simulation-form-status");
    if (!form || !status) return;

    const translated = (key, fallback) => {
        if (typeof getTranslation === "function" && typeof currentLanguage !== "undefined") {
            return getTranslation(key, currentLanguage) || fallback;
        }
        return fallback;
    };

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!form.reportValidity()) return;

        const submitButton = form.querySelector(".submit-btn");
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = translated("simulationPage.status.submittingButton", "提交中...");
        status.textContent = translated("simulationPage.status.submitting", "正在提交，请稍候。");

        try {
            const formData = new FormData(form);
            formData.set("page_url", window.location.href);
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                form.reset();
                status.textContent = translated("simulationPage.status.success", "提交成功，我们会尽快与您联系。");
                return;
            }

            let errorMessage = translated(
                "simulationPage.status.failed",
                "提交失败，请稍后重试，或直接发送邮件至 rrui_info@163.com。"
            );
            try {
                const data = await response.json();
                if (data.errors && Array.isArray(data.errors)) {
                    errorMessage = data.errors.map((error) => error.message).join("；");
                }
            } catch (jsonError) {}
            status.textContent = errorMessage;
        } catch (error) {
            status.textContent = translated(
                "simulationPage.status.network",
                "网络异常，请稍后重试，或直接发送邮件至 rrui_info@163.com。"
            );
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
})();
