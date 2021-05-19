export default {
    namespaced: true,

    state: () => ({
        lineDataFirst: {
            interval: [],
            sum: 0,
        },
        stockBalances: {
            storehouse: [
                {
                    name: '',
                    iso: [],
                    pol: [],
                    pen: [],
                },
            ],
            in_total: {
                iso: 0,
                pol: 0,
                pen: 0
            },
        },
        comparisonModule: {
            suitable1: 0,
            change_suitable1: 0,
            suitable2: 0,
            substandard1: 0,
            change_substandard1: 0,
            substandard2: 0,
            defect1: 0,
            change_defect1: 0,
            defect2: 0,
            flooded1: 0,
            change_flooded1: 0,
            flooded2: 0,
            sum1: 0,
            change_sum1: 0,
            sum2: 0,
            isQuery: false,
        },
        energyConsumption: {
            input1: 0,
            input2: 0,
            gas: 0,
        },
        totalConsumption: {
            iso: 0,
            pol: 0,
            pen: 0,
            kat1: 0,
            kat2: 0,
            kat3: 0,
        },
        specificConsumption: {
            iso: 0,
            pol: 0,
            pen: 0,
            kat1: 0,
            kat2: 0,
            kat3: 0,
        },
        panelRelease: {
            suitable: 0,
            change_suitable: 0,
            substandard: 0,
            change_substandard: 0,
            defect: 0,
            change_defect: 0,
            flooded: 0,
            change_flooded: 0,
            sum: 0,
            change_sum: 0,
        }
    }),
    getters: {
        lineDataFirst(state) {
            let lineDataFirst = JSON.parse(JSON.stringify(state.lineDataFirst));
            let intervalNew = [];
            lineDataFirst.interval.forEach((item) => {
                item.progress = Math.floor((item.duration / lineDataFirst.sum) * 100);
                item.duration = item.duration.toFixed(2);

                intervalNew.push(item);
            });

            lineDataFirst.interval = intervalNew;

            return lineDataFirst;
        },
        comparisonModule(state) {
            return state.comparisonModule;
        },
        energyConsumption(state) {
            return state.energyConsumption;
        },
        totalConsumption(state) {
            return state.totalConsumption;
        },
        specificConsumption(state) {
            return state.specificConsumption;
        },
        stockBalances(state) {
            return state.stockBalances;
        },
        panelRelease(state) {
            return state.panelRelease;
        }
    },
    mutations: {
        setLineDataFirst(state, data) {
            state.lineDataFirst = data;
        },
        setComparisonModule(state, data) {
            state.comparisonModule = data;
        },
        setEnergyConsumption(state, data) {
            state.energyConsumption = data;
        },
        setTotalConsumption(state, data) {
            state.totalConsumption = data;
        },
        setSpecificConsumption(state, data) {
            state.specificConsumption = data;
        },
        setStockBalances(state, data) {
            state.stockBalances = data;
        },
        setPanelRelease(state, data) {
            state.panelRelease = data;
        }
    },
    actions: {
        async getLineDataFirst(store, option) {
            let data = {
                interval: [],
                sum: 0,
            };

            try {
                if (option.smena)
                    data = await this.$axios.$get(`/dashboard/duration/${formatDate(option.date)}/shift/${option.smena}`);
                else
                    data = await this.$axios.$get(`/dashboard/duration/${formatDate(option.date)}/day/`);

                if (!data)
                    throw new Error('return data is null');

            } catch (e) {
               
               
             
            }

            store.commit('setLineDataFirst', data);
        },
        async getComparisonModule(store, option) {
            debugger
            let data = null;
            try {
                if (option.id1 && option.id2)
                    data = await this.$axios.$get(`/dashboard/comparison/shift/${formatDate(option.date1)}/${option.id1}/${formatDate(option.date2)}/${option.id2}`);
                else if (option.isType1 === 'day')
                    data = await this.$axios.$get(`/dashboard/comparison/day/${formatDate(option.date1)}/${formatDate(option.date2)}`);
                else if (option.isType1 === 'month')
                    data = await this.$axios.$get(`/dashboard/comparison/month/${formatDate(option.date1)}/${formatDate(option.date2)}`);

                data.isQuery = true;

                if (!data)
                    throw new Error('return data is null');
            } catch (e) {
              
           
            }

            store.commit('setComparisonModule', data);
        },
        async getEnergyConsumption(store, option) {
            let data = {
                    input1: 0,
                    input2: 0,
                    gas: 0,
                };

            try {
                if (option.id1)
                    data = await this.$axios.$get(`/dashboard/energyconsumption/${formatDate(option.date)}/shift/${option.id1}/`);
                else if (option.isType1 === 'day')
                    data = await this.$axios.$get(`/dashboard/energyconsumption/${formatDate(option.date)}/day/`);
                else if (option.isType1 === 'month')
                    data = await this.$axios.$get(`/dashboard/energyconsumption/${formatDate(option.date)}/month/`);

                if (!data)
                    throw new Error('return data is null');

            } catch (e) {
               
            }

            store.commit('setEnergyConsumption', data);
        },
        async getTotalConsumption(store, option) {
            let data = {
                    iso: 0,
                    pol: 0,
                    pen: 0,
                    kat1: 0,
                    kat2: 0,
                    kat3: 0,
                };
            try {
                if (option.id1)
                    data = await this.$axios.$get(`/dashboard/sumexpense/${formatDate(option.date)}/shift/${option.id1}/`);
                else if (option.isType1 === 'day')
                    data = await this.$axios.$get(`/dashboard/sumexpense/${formatDate(option.date)}/day/`);
                else if (option.isType1 === 'month')
                    data = await this.$axios.$get(`/dashboard/sumexpense/${formatDate(option.date)}/month/`);

                if (!data)
                    throw new Error('return data is null');
            } catch (e) {
              
            }

            store.commit('setTotalConsumption', data);
        },
        async getSpecificConsumption(store, option) {
            let data = {
                    iso: 0,
                    pol: 0,
                    pen: 0,
                    kat1: 0,
                    kat2: 0,
                    kat3: 0,
                };

            try {
                if (option.id1)
                    data = await this.$axios.$get(`/dashboard/specificconsumption/${formatDate(formatDate(option.date))}/shift/${option.id1}/`);
                else if (option.isType1 === 'day')
                    data = await this.$axios.$get(`/dashboard/specificconsumption/${formatDate(formatDate(option.date))}/day/`);
                else if (option.isType1 === 'month')
                    data = await this.$axios.$get(`/dashboard/specificconsumption/${formatDate(formatDate(option.date))}/month/`);

                if (!data)
                    throw new Error('return data is null');

            } catch (e) {
              
            }

            store.commit('setSpecificConsumption', data);
        },
        async getStockBalances(store, option) {
            let data = {
                    storehouse: [],
                    "in_total": {
                        "iso": 0,
                        "pol": 0,
                        "pen": 0,

                    }
                };
            try {
                data = await this.$axios.$get(`/dashboard/remainder/${formatDate(option.date)}/`);
                if (!data)
                    throw new Error('return data is null');
            } catch (e) {
             
            }

            store.commit('setStockBalances', data);
        },
        async getPanelRelease(store, option) {
            let data = {
                    suitable: 0,
                    change_suitable: 0,
                    substandard: 0,
                    change_substandard: 0,
                    defect: 0,
                    change_defect: 0,
                    flooded: 0,
                    change_flooded: 0,
                    sum: 0,
                    change_sum: 0,
                };
            try {
                if (option.id1)
                    data = await this.$axios.$get(`/dashboard/edition/${formatDate(option.date)}/shift/${option.id1}/`);
                else if (option.isType1 === 'day')
                    data = await this.$axios.$get(`/dashboard/edition/${formatDate(option.date)}/day/`);
                else if (option.isType1 === 'month')
                    data = await this.$axios.$get(`/dashboard/edition/${formatDate(option.date)}/month/`);

                if (!data)
                    throw new Error('return data is null');
            } catch (e) {
              
            }

            store.commit('setPanelRelease', data);
        }
    },
    strict: process.env.NODE_ENV !== 'production'
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function formatDate(date) {
    let d = new Date(date);

    return d.getFullYear() + "-" + d.getMonth() + 1 + "-" + d.getDate();
}