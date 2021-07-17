<template>
    <div id="main">
        <div id="problem-view">
            <Datepicker
                v-model="date"
                :inline="true"
                :day-cell-content="hasProblem"
                class="item calendar"
            />

            <template v-if="selected && selected.valid">
                <Problem
                    :problem="selected"
                    class="item problem"
                />
            </template>
            <template v-else>
                <div class="spacer" />
            </template>
        </div>

        <Github />
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import Problem from '@/components/Problem.vue';
import Github from '@/components/Github.vue';
import { mapGetters } from 'vuex';

export default {
    name: 'HelloWorld',
    components: {
        Problem,
        Github,
        Datepicker,
    },
    props: {
        msg: { 
            type: String, 
            default: 'Hi'
        },
    },
    data: () => ({
        show: true,
        date: new Date(),
        calendarStyle: 'calendar'
    }),
    computed: {
        ...mapGetters({
            todayProblem: 'problems/todayParsed',
            todayProblemVerbose: 'problems/today',
        }),
        selected: {
            get() {
                if (!this.date) return {};
                return this.$store.getters['problems/problem'](this.format(this.date));
            },
        },
    },
    created() {
        this.$store.dispatch('problems/fetchProblems');
    },
    methods: {
        format(date) {
            const d = {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
            };
            return d;
        },
        hasProblem(date) {
            const d = this.format(new Date(date.timestamp));
            const p = this.$store.getters['problems/problem'](d);
            if (p && p.valid) {
                return '<a class="has">' + date.date + '</a>';
            }
            
            return date.date;
        }
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#main {
    display: flex;
    flex-direction: column;
    max-width: 960px;
    margin: 0 auto;
}
#problem-view {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 2fr));
    gap: 20px;
    width: 100%;

    .item {
        margin: 0 auto;
    }
    .calendar {
        width: 100%;
    }
    .spacer {
        width: 100%;
        height: 100%;
        border: 1px gray solid;
    }
}
::v-deep .has {
    color: red;
    font-weight: bold;
}
::v-deep .vdp-datepicker__calendar {
    width: unset;
}
</style>
