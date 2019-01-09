<script>
export default {
  name: 'Tab',
  props: {
    index: {
      required: true,
      type: [Number, String]
    },
    label: {
      type: String,
      default: 'tab'
    }
  },
  inject: ['o'],
  computed: {
    active() {
      return this.o.value == this.index
    }
  },
  mounted() {
    this.$parent.panes.push(this)
  },
  render() {
    const tab = this.$slots.label || <span>{this.label}</span>
    const classNames = {
      tab: true,
      active: this.active
    }
    return (
      <li class={classNames} onClick={this.handleClick}>
        {tab}
      </li>
    )
  },
  methods: {
    handleClick() {
      this.$parent.onChange(this.index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tab
  list-style none
  line-height 40px
  margin-right 30px
  position relative
  bottom -2px
  cursor pointer

  &.active
    border-bottom 2px solid blue

  &:last-child
    margin-right 0
</style>