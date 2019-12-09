const connect = store =>
  /**
   * @template T: Any
   * @param {{ new(): T }} baseClass
   * @returns {{ new(): T }}
   */
  baseClass => class extends baseClass {
    connectedCallback() {
      if (super.connectedCallback) {
        super.connectedCallback();
      }

      this.unsubscribe = store.subscribe(() => this.stateChanged(store.getState()));
      this.stateChanged(store.getState());
    }

    disconnectedCallback() {
      this.unsubscribe && this.unsubscribe();

      if (super.disconnectedCallback) {
        super.disconnectedCallback()
      }
    }

    stateChanged(state) {}
  };

export default connect;