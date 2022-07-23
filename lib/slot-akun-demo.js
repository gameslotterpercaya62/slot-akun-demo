'use babel';

import SlotAkunDemoView from './slot-akun-demo-view';
import { CompositeDisposable } from 'atom';

export default {

  slotAkunDemoView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.slotAkunDemoView = new SlotAkunDemoView(state.slotAkunDemoViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.slotAkunDemoView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'slot-akun-demo:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.slotAkunDemoView.destroy();
  },

  serialize() {
    return {
      slotAkunDemoViewState: this.slotAkunDemoView.serialize()
    };
  },

  toggle() {
    console.log('SlotAkunDemo was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
