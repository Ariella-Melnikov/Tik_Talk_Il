<template>
    <div class="admin-page">
        <h1>{{ $t('header.admin') }}</h1>
     <h2>{{ $t('table.adultheader') }}</h2>
        <table>
            <thead>
                <tr>
                    <th>{{ $t('table.fullname') }}</th>
                    <th>{{ $t('table.email') }}</th>
                    <th>{{ $t('table.phone') }}</th>
                    <th>{{ $t('table.course') }}</th>
                    <th>{{ $t('table.subscribed') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(submission, index) in adultSubmissions" :key="index">
                    <td>{{ submission.fullName }}</td>
                    <td>{{ submission.email }}</td>
                    <td>{{ submission.phone }}</td>
                    <td>{{ submission.courseType }}</td>
                    <td>{{ submission.isSubscribe ? 'Yes' : 'No' }}</td>
                </tr>
            </tbody>
        </table>

        <h2>{{ $t('table.kidsheader') }}</h2>
        <table>
            <thead>
                <tr>
                    <th>{{ $t('table.parentname') }}</th>
                    <th>{{ $t('table.parentemail') }}</th>
                    <th>{{ $t('table.parentphone') }}</th>
                    <th>{{ $t('table.kidsage') }}</th>
                    <th>{{ $t('table.subscribed') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(submission, index) in kidsSubmissions" :key="index">
                    <td>{{ submission.parentFullName }}</td>
                    <td>{{ submission.parentEmail}}</td>
                    <td>{{ submission.parentPhone }}</td>
                    <td>{{ submission.kidsAge }}</td>
                    <td>{{ submission.isSubscribe ? 'Yes' : 'No' }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { siteService } from '@/services/site.service.js'

export default {
    data() {
        return {
            adultSubmissions: [],
            kidsSubmissions: []
        };
    },
    async created() {
        try {
            this.adultSubmissions = await siteService.getAdultSubmissions();
            this.kidsSubmissions = await siteService.getKidsSubmissions();
        } catch (error) {
            console.error('Failed to fetch submissions', error);
        }
    }
};
</script>


<style lang="scss">
.admin-page {
    padding: 2rem;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}

th, td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
}

th {
    background-color: #f4f4f4;
}

td {
    background-color: #faf9ef;
}
</style>