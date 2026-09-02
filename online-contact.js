(function () {
    "use strict";

    const config = window.RRTekOnlineContact || {};
    const previewMode = new URLSearchParams(window.location.search).get("onlineContactPreview") === "1";
    const canOpenLiveChat = config.enabled === true && typeof config.openChat === "function";

    if (!previewMode && !canOpenLiveChat) {
        return;
    }

    const copy = {
        zh: {
            label: "在线联系",
            previewTitle: "在线客服组件预览",
            previewBody: "美洽企业认证完成并取得接入代码后，此处将直接打开实时聊天窗口。"
        },
        en: {
            label: "Online Chat",
            previewTitle: "Online chat preview",
            previewBody: "This button will open live chat after the Meiqia verification and integration are completed."
        },
        fr: {
            label: "Chat en ligne",
            previewTitle: "Aperçu du chat en ligne",
            previewBody: "Ce bouton ouvrira le chat en direct après la vérification et l’intégration de Meiqia."
        }
    };

    const language = () => {
        const value = document.documentElement.lang.toLowerCase();
        if (value.startsWith("en")) return "en";
        if (value.startsWith("fr")) return "fr";
        return "zh";
    };

    const root = document.createElement("div");
    root.className = "rr-online-contact";
    root.innerHTML = `
        <div class="rr-online-contact__preview" role="status" hidden>
            <strong></strong>
            <p></p>
        </div>
        <button class="rr-online-contact__button" type="button">
            <svg class="rr-online-contact__icon" viewBox="0 0 24 24" aria-hidden="true" fill="none">
                <path d="M6.5 18.2 3.5 20l.8-3.6A8 8 0 1 1 6.5 18.2Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
                <path d="M8 11.5h.01M12 11.5h.01M16 11.5h.01" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
            </svg>
            <span class="rr-online-contact__label"></span>
        </button>`;

    const button = root.querySelector(".rr-online-contact__button");
    const label = root.querySelector(".rr-online-contact__label");
    const preview = root.querySelector(".rr-online-contact__preview");
    const previewTitle = preview.querySelector("strong");
    const previewBody = preview.querySelector("p");

    function updateCopy() {
        const text = copy[language()];
        label.textContent = text.label;
        button.setAttribute("aria-label", text.label);
        previewTitle.textContent = text.previewTitle;
        previewBody.textContent = text.previewBody;
    }

    button.addEventListener("click", () => {
        if (canOpenLiveChat) {
            config.openChat();
            return;
        }
        preview.hidden = !preview.hidden;
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") preview.hidden = true;
    });

    new MutationObserver(updateCopy).observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["lang"]
    });

    updateCopy();
    document.body.appendChild(root);
})();
