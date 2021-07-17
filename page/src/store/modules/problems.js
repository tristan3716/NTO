import axios from '@/plugins/axios.js';

const isDaily = (raw) => {
    const filtered = raw.labels.filter(e => e.name == 'Daily');
    return filtered.length > 0;
};
const trim = (number) => {
    return number.replace(/^0/, '');
};
const parseTitle = (rawInfo) => {
    return {
        date: {
            year: rawInfo[1],
            month: trim(rawInfo[2]),
            day: trim(rawInfo[3]),
        },
        info: {
            source: rawInfo[4],
            level: rawInfo[5],
        },
        id: rawInfo[6],
        title: rawInfo[7],
    };
};
const titleReg = new RegExp(/\[(\d{4}).(\d{2}).(\d{2})\]\s*(\S+)\s*\/\s*(\S+\s*\d)\s*\/\s*(\d+)\s*-\s*(.*)$/);
const getTitle = (title) => {
    return titleReg.exec(title);
};
const urlReg = new RegExp(/## 링크.*?(https:\/\/.*?\d+)>?\s*?>?\n/, 's');
const getLink = (body) => {
    return urlReg.exec(body)[1];
};
const remarkReg = new RegExp(/## 비고.*?-->(.*)/, 's');
const getRemark = (body) => {
    const remark = remarkReg.exec(body);
    if (remark && remark.length > 1) {
        return remark[1].trim();
    } else {
        return null;
    }
};
const issueReg = new RegExp(/\/(\d+)/);
const parseProblem = (raw) => {
    let problemInfo = {
        valid: false,
    };

    try {
        const titleInfo = parseTitle(getTitle(raw.title));
        const remark = getRemark(raw.body);
        Object.assign(problemInfo, titleInfo);
        const issueId = issueReg.exec(raw.url)[1];
        problemInfo.github = {
            id: issueId,
            issue:`https://github.com/Team-NTO/NTO/issues/${issueId}`,
            user: raw.user.login
        };
        problemInfo.link = getLink(raw.body);
        problemInfo.remark = remark;
        problemInfo.valid = true;
    } catch (e) {
        problemInfo.error = e;
    }

    return problemInfo;
};
const getKeyByDate = (date) => {
    const year = parseInt(date.year);
    const month = parseInt(date.month);
    const day = parseInt(date.day);
    return year * 100000 + month * 100 + day;
};
const getKeyByProblem = (problem) => {
    return getKeyByDate(problem.date);
};

export default {
    namespaced: true,
    state: {
        problems: [],
        problemMap: {},
    },
    getters: {
        problem: (state) => (date) => {
            return state.problemMap[getKeyByDate(date)];
        },
        todayParsed(state) {
            let i = 0;
            while(!isDaily(state.problems[i])) {
                i++;
            }
            return parseProblem(state.problems[i]);
        },
        today(state) {
            return state.problems[0];
        },
        all(state) {
            return state.problems;
        },
    },
    mutations: {
        SET_PROBLEMS(state, { problems }) {
            for (const problem of problems) {
                const parsed = parseProblem(problem);
                if (parsed.valid) {
                    const key = getKeyByProblem(parsed);
                    state.problemMap[key] = parsed;
                }
            }

            state.problems = problems;
        },
    },
    actions: {
        fetchProblems({state, commit, dispatch}, index = 1) {
            return new Promise((resolve, reject) => {
                axios({
                    url: 'https://api.github.com/repos/Team-NTO/NTO/issues',
                    method: 'GET',
                    params: {
                        page: index,
                    },
                }).then((response) => {
                    const problems = response.data;
                    commit('SET_PROBLEMS', {
                        problems,
                    });
                    if (response.data.length >= 30) {
                        dispatch('fetchProblems', index + 1);
                    }
                }).catch((error) => {
                    reject(error);
                });

                resolve(state.problems);
            });

        }
    },
};