<template>
    <div id="taxonomies-page">
        <div v-if="isLoading" class="loading">    
            <v-progress-circular
                :size="70"
                :width="7"
                color="green"
                indeterminate
            ></v-progress-circular>
        </div>
        <v-card class="tax-card" v-else>
            <v-card-title>Taxonomies</v-card-title>
            <v-card-subtitle>
                Add taxonomies to help categorize your regular pages.
            </v-card-subtitle>
            <v-card-text>
                <v-list>
                    <v-list-item
                        v-for="(tax, index) in taxonomies"
                        :key="tax.id"
                        class="border" 
                    >
                        <v-list-item-avatar>
                            <v-btn @click="toggleEdit(index)" icon>
                                <v-icon color="grey lighten-1">
                                    {{ (tax.editing)? 'mdi-check' : 'mdi-pencil' }}
                                </v-icon>
                            </v-btn>
                        </v-list-item-avatar>

                        <v-list-item-content>
                        <v-list-item-title v-if="!tax.editing">{{ tax.plural }}</v-list-item-title>
                        <v-list-item-title v-else>
                            <v-text-field label="Singular" v-model="tax.singular"></v-text-field>
                            <v-text-field label="Plural" v-model="tax.plural"></v-text-field>
                            <v-text-field label="Slug" v-model="tax.slug"></v-text-field>
                        </v-list-item-title>
                        </v-list-item-content>

                        <v-list-item-action>
                            
                            <v-btn @click="delTax(index)" icon>
                                <v-icon color="grey lighten-1">mdi-delete</v-icon>
                            </v-btn>
                        
                        </v-list-item-action>
                    </v-list-item>
                    <br />
                </v-list>
                <v-btn
                    absolute
                    dark
                    fab
                    bottom
                    middle
                    left
                    color="blue"
                    @click="newTax()"
                    >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>
import database from '@/firebase/firestore.js'

export default {
    name: 'TaxonomiesPage',
    data() {
        return {
            isLoading: true,
            taxonomies: [
                {
                    singular: 'Tag',
                    plural: 'Tags',
                    slug: 'tag',
                    id: Date.now(),
                    editing: false
                }
            ]
        }
    },
    async created() {
        this.$store.commit('setPageTitle', 'Taxonomies');
        this.$store.commit('setCanSave', true);

        let taxObj = (await database.doc('/hotplate-cms/taxonomies').get()).data();
        this.taxonomies = Object.values(taxObj);
        this.isLoading = false;
    },
    methods: {
        newTax() {
            this.taxonomies.forEach(tax => tax.editing = false);
            this.taxonomies.push({
                id: Date.now(),
                editing: true
            });
        },
        delTax(index) {
            this.taxonomies.splice(index, 1);
        },
        toggleEdit(index) {
            this.taxonomies[index].editing = !this.taxonomies[index].editing;
        },
        save(callback, err = e => { alert(`An error occurred: ${e}`) }) {
            let taxObj = {};

            for (let tax of this.taxonomies) {
                taxObj[tax.slug] = tax;
            }

            database.doc('/hotplate-cms/taxonomies').set(taxObj).then(callback).catch(err);
        }
    }
}
</script>

<style lang="scss">

#taxonomies-page {
    padding: 10px;
    
    .tax-card {
        max-width: 500px;
        margin: auto;
    }

    .loading {
        text-align: center;
    }

    .border {
        border: 1px solid lightgray;
        border-radius: 5px;
        padding: 10px;
        margin: 5px;
    }
}

</style>