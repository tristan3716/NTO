<template>
    <div class="problem">
        <div class="item date year align-v">
            {{ problem.date.year }}년
        </div>
        <div class="item date month align-v">
            {{ problem.date.month }}월
        </div>
        <div class="item date day align-v">
            {{ problem.date.day }}일
        </div>

        <div class="item title align-v">
            {{ problem.title }}
        </div>

        <div class="item link align-v">
            <a 
                :href="problem.link"
                target="_blank"
            >
                {{ problem.link }}
            </a>
        </div>

        <div class="item level align-v">
            {{ problem.info.level }}
        </div>
        <div class="item user align-v">
            {{ problem.github.user }}
        </div>
        <div class="item issue align-v">
            <a 
                :href="problem.github.issue"
                target="_blank"
            >
                Issue {{ problem.github.id }}
            </a>
        </div>

        <div class="item remark">
            <strong>비고</strong>
            <br>
            {{ problem.remark }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Problem',
    props: {
        problem: {
            type: Object,
            required: true,
        }
    }
};
</script>

<style lang="scss" scoped>
.align-v {
    display: flex;
    align-items: center;
    justify-content: center;
}
.problem {
    border: 1px gray solid;
    display: grid;
    width: 100%;
    grid-template-rows: 0.4fr 1fr 0.4fr repeat(3, 1fr);
    grid-template-columns: repeat(5, 1fr);
    grid-template-areas:
        ".      year    month       day         ."
        "title  title   title       title       title"
        "link   link    link        link        link"
        "level  level   remark      remark     remark"
        "user   user    remark      remark     remark"
        "issue  issue   remark      remark     remark";

    .item {
        padding: 8px;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
    }
    .date {
        font-size: 0.8rem;
    }
    .year {
        justify-content: flex-end;
        grid-area: year;
    }
    .month {
        grid-area: month;
    }
    .day {
        justify-content: flex-start;
        grid-area: day;
    }
    .title {
        border-top: 1px gray solid;
        padding-bottom: 0px;
        font-weight: bold;
        grid-area: title;
    }
    .source {
        grid-area: source;
    }
    .link {
        border-bottom: 1px gray solid;
        padding-top: 0px;
        grid-area: link;
    }
    .level {
        border-bottom: 1px gray solid;
        grid-area: level;
    }
    .user {
        border-bottom: 1px gray solid;
        grid-area: user;
    }
    .issue {
        grid-area: issue;
    }
    .remark {
        border-left: 1px gray solid;
        grid-area: remark;
    }
}

</style>