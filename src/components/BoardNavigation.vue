<template>
  <div class="col-1 d-flex justify-content-end" v-if="boardsCount > 1">
    <b-icon
      role="button"
      :class="[{ disabled: !canGoLeft }, 'mr-1']"
      :icon="leftIcon"
      @click="goLeft"
    />
    <b-icon
      role="button"
      :class="{ disabled: !canGoRight }"
      :icon="rightIcon"
      @click="goRight"
    />
  </div>
</template>
<script lang="ts">
import Board from "@/models/Board";
import Vue from "vue";

export default Vue.extend({
  props: {
    currentBoardId: { type: String },
  },
  computed: {
    allBoards(): Board[] {
      return Board.all();
    },
    boardsCount(): number {
      return Board.query().count();
    },
    currentIndex(): number {
      return this.allBoards.findIndex(
        (board) => board.id === this.currentBoardId
      );
    },
    canGoLeft(): boolean {
      return this.currentIndex > 0;
    },
    canGoRight(): boolean {
      return this.currentIndex < this.boardsCount - 1;
    },
    leftIcon(): string {
      return this.canGoLeft ? "caret-left-fill" : "caret-left";
    },
    rightIcon(): string {
      return this.canGoRight ? "caret-right-fill" : "caret-right";
    },
  },
  methods: {
    goLeft(): void {
      if (this.canGoLeft) {
        this.$store.commit(
          "setCurrentBoard",
          this.allBoards[this.currentIndex - 1]
        );
      }
    },
    goRight(): void {
      if (this.canGoRight) {
        this.$store.commit(
          "setCurrentBoard",
          this.allBoards[this.currentIndex + 1]
        );
      }
    },
  },
});
</script>
<style lang="scss" scoped>
/deep/ .b-icon {
  font-size: 22px;
}
.disabled {
  cursor: default;
  opacity: 0.6;
}
</style>
