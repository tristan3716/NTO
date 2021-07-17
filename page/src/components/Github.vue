<template>
    <div id="github-api-info">
        <div class="table header">
            <div class="item">
                제한
            </div>
            <div class="item">
                잔여
            </div>
            <div class="item">
                사용
            </div>
            <div class="item">
                초기화
            </div>
        </div>
        <div class="table body">
            <div class="item">
                {{ limit }}
            </div>
            <div class="item">
                {{ remaining }}
            </div>
            <div class="item">
                {{ used }}
            </div>
            <div class="item">
                {{ reset }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Github',
    computed: {
        ...mapGetters({
            limit: 'github/limit',
            remaining: 'github/remaining',
            used: 'github/used',
            reset: 'github/reset',
        }),
    },
    created() {
        this.$store.dispatch('github/fetchApiInfo');
    },
};
</script>

<style lang="scss" scoped>
#github-api-info {
    width: 60%;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
}
.table {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-top: 1px black solid;
    border-bottom: 1px black solid;
}
.item {
    align-self: center;
}
</style>