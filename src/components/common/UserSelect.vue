<template>
  <v-select
    v-model="user"
    :items="list"
    :label="$t('user')"
    outlined
    dark
    return-object
    :item-text="(item) => `${item.username} - ${item.name} ${item.family} ` "
    placeholder="Start typing to Search"
    prepend-icon="mdi-account"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: [Object, null],
      default: null
    },
    exclude: {
      type: Array,
      default: () => ([])
    },
  },
  data () {
    return {
      isLoading: false,
      users: [],
    }
  },

  mounted () {
    this.getUsers('');
  },

  computed: {
    list () {
      return this.users.filter(user => !this.exclude.find(item => item === user._id))
    },
    user: {
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