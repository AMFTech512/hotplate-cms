<template>
  <div class="sub-list-comp">
    <v-card class="card">
        <v-card-title>
            <h2>{{ retVal.subject }}</h2>
        </v-card-title>
        <v-card-text>
            <v-text-field
                v-model="retVal.subject"
                label="Subject">
            </v-text-field>
            <br />
            <h3>Topics</h3>
            <v-row v-for="(item, index) in retVal.items" :key="index" class="item-list">
                <v-col cols="10">
                    <v-text-field
                        v-model="retVal.items[index]"
                        :label="`Item ${index + 1}`">
                    </v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-btn @click="delItem(index)" color="error">Delete</v-btn>
                </v-col>
            </v-row>
            <br />
            <v-btn color="primary" @click="addItem" :disabled="reachedMax">Add</v-btn>
        </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
    name: 'ListComponent',
    data() {
        return {
            retVal: this.value
        }
    },
    props: {
        name: String,
        props: {
            type: Object,
            default: function() {
                return {
                    headerTxt: 'List',
                    maxItems: 0
                };
            }
        },
        value: {
            type: Object,
            default: function() { 
                return { 
                    items: [],
                    subject: ''
                }
            }
        }
    },
    created() {
        this.updateData();
    },
    methods: {
        updateData() {
            this.$emit('input', this.retVal);
        },
        addItem() {
            this.retVal.items.push("");
            this.updateData();
        },
        delItem(index) {
            this.retVal.items.splice(index, 1);
            this.updateData();
        }
    },
    computed: {
        reachedMax() {
            if(this.props.maxItems == 0)
                return false;
            return this.retVal.items.length >= this.props.maxItems;
        }
    }
}
</script>

<style lang="scss">

.sub-list-comp {
    
    margin: 10px;

    .card {
        // min-width: 400px;
        margin: 0 auto;
    }

    h1 {
        line-height: 2.5rem;
    }

    .item-list {
        text-align: center;
    }
}

</style>