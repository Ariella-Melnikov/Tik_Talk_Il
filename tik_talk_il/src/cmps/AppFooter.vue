<template>
    <footer>
        <div class="social-links">
            <h2 class="footer-text">TIK TALK Make English Easy</h2>
            <a
                href="https://www.instagram.com/_tik_talk_il_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'instagram']" class="social-icon" />
            </a>
            <a href="https://www.linkedin.com/in/shoham-joseph-835b091b4/" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'linkedin']" class="social-icon" />
            </a>
             <a href="https://www.facebook.com/share/7LXTQzSCCi1kAVza/?mibextid=kFxxJD" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'facebook']" class="social-icon" />
            </a>

            <a href="https://www.tiktok.com/@tik.talk.il?_t=8qwaKAbPdPL&_r=1" target="_blank" rel="noopener noreferrer">
                <font-awesome-icon :icon="['fab', 'tiktok']" class="social-icon" />
            </a>
        </div>
    </footer>
</template>

<style lang="scss">
footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    background-image: url('@/assets/img/header_background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: background-color 0.3s ease;
}

.social-links {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    justify-content: center;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
}

.footer-text {
    font-size: 1rem;
    color: #2d2a6c;
    margin: 0;
    line-height: 1;
    display: inline-block;
    padding-right: 0.5rem;
}

.social-icon {
    font-size: 2rem; /* Adjust the size of the icons */
    color: #0e0d0d;
    transition: color 0.3s ease;

    &:hover {
        color: #4c68d7; /* Change icon color on hover */
    }
}
</style>
