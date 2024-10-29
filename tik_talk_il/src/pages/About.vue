<template>
    <section class="about-page">
        <div class="banner">
            <h1 class="banner-title top-center" v-html="$t('about.title')"></h1>
        </div>

        <div class="mission">
            <h2>{{ $t('about.missionTitle') }}</h2>
            <p>{{ $t('about.missionDescription') }}</p>
        </div>

        <div class="offerings">
            <h2>{{ $t('about.offeringsTitle') }}</h2>
            <ul>
                <li>{{ $t('about.offeringsKids') }}</li>
                <li>{{ $t('about.offeringsWomen') }}</li>
                <li>{{ $t('about.offeringsBusiness') }}</li>
            </ul>
        </div>

        <div class="why-choose-us">
            <h2>{{ $t('about.whyChooseUsTitle') }}</h2>
            <p>{{ $t('about.whyChooseUsDescription') }}</p>
        </div>

    </section>
</template>

<script>
export default {
    name: 'About',
}
</script>

<style lang="scss">
.about-page {
    text-align: center;

    /* Banner Section */
    .banner {
        position: relative;
        background-image: url('@/assets/img/banners/banner-shoham-3.png');
        background-size: cover;
        background-position: center;
        height: 50vh; /* Adjust height as needed */
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
    }

    .banner-title {
        font-size: 4rem; /* Adjust as needed */
        font-weight: bold;
        z-index: 1; /* Ensures the title stays on top of any other content */
        margin: 0;

        &.top-center {
            align-self: flex-start;
            text-align: center;
            margin-top: 6.25rem;
            margin-inline-end: 27rem;
        }
    }
    h1 {
        color: #4c3777;
        font-size: 2.5rem;
        margin-bottom: 2rem;
    }

    .mission,
    .offerings,
    .why-choose-us {
        margin-bottom: 2rem;

        h2 {
            color: #2d2a6c;
            font-size: 1.8rem;
            margin-bottom: 1rem;
        }

        p,
        ul {
            color: #333;
            font-size: 1.2rem;
            line-height: 1.5;
        }

        ul {
            list-style: disc;
            padding-left: 1.5rem;
            text-align: left;
        }
    }

    .about-image {
        width: 100%;
        max-width: 600px;
        border-radius: 8px;
        margin-top: 2rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
}
</style>
