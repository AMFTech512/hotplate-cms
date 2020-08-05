<template>
  <v-list-item
        class="border">
        <v-list-item-avatar>
            <v-btn @click="toggleEdit(tax.id)" icon>
                <v-icon color="grey lighten-1">
                    {{ (editing)? 'mdi-check' : 'mdi-pencil' }}
                </v-icon>
            </v-btn>
        </v-list-item-avatar>

        <v-list-item-content>
        <v-list-item-title v-if="!editing">{{ tax.plural }}</v-list-item-title>
        <v-list-item-title v-else>
            <v-text-field label="Singular" @keypress="update" v-model="tax.singular"></v-text-field>
            <v-text-field label="Plural" @keypress="update" v-model="tax.plural"></v-text-field>
            <v-text-field label="Slug" @keypress="update" v-model="tax.slug"></v-text-field>
        </v-list-item-title>

        <div class="border" v-if="editing">
            <h3>{{ tax.plural }}</h3>

            <v-text-field 
                :label="`New ${tax.singular || 'value'}`" 
                v-model="newval"
                append-icon="mdi-plus"
                @click:append="addVal"
                @keypress.enter="addVal"></v-text-field>

            <v-chip-group
                column
                active-class="primary--text">
                <v-chip
                    v-for="(val, index) in values"
                    :key="index"
                    close
                    color="blue"
                    text-color="white"
                    @click:close="delVal(index)">
                    {{ val }}
                </v-chip>
            </v-chip-group>
        </div>

        </v-list-item-content>

        <v-list-item-action>
            
            <v-btn @click="$emit('delete', tax.id)" icon>
                <v-icon color="grey lighten-1">mdi-delete</v-icon>
            </v-btn>
        
        </v-list-item-action>
    </v-list-item>
</template>

<script>
export default {
    name: 'TaxonomyComp',
    data() {
        return {
            editing: false,
            tax: this.value,
            newval: '',
            values: this.value.values
        };
    },
    props: ['value'],
    methods: {
        toggleEdit() {
            this.editing = !this.editing;
        },
        update() {
            this.tax.values = this.values;
            this.$emit('input', this.tax);
        },
        delVal(index) {
            this.values.splice(index, 1);
            this.update();
        },
        addVal() {
            if(!this.values) this.values = [];
            this.values.push(this.newval);
            this.newval = '';
            this.update();
        }
    },
    created() {
        if(!this.tax.slug) {
            this.editing = true;
        }
    }
}
</script>

<style>

</style>