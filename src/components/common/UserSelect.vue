<template>
  <v-select
    v-model="list"
    :items="users"
    label="Select"
    multiple
    chips
    deletable-chips
    item-text="name"
    item-value="_id"
    placeholder="Start typing to Search"
    prepend-icon="mdi-account"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
  },
  data () {
    return {
      isLoading: false,
      users: []
    }
  },

  mounted () {
    this.getUsers('');
  },

  computed: {
    list: {
      get: function () {
        return this.value
      },
      set: function (newValue) {
        this.$emit('input', newValue)
      }
    }
  },

  methods: {
    async getUsers (q) {
      try {
        this.isLoading = true
        const { data } = await this.axios.get('users?q=' + q);
        this.users = data;
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>