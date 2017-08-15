'use babel';

import COLUtilsView from './colutils-view';
import { CompositeDisposable } from 'atom';
import Covert from './covert';

export default {

  colutilsView: null,
  subscriptions: null,

  activate(state) {
    this.colutilsView = new COLUtilsView(state.colutilsViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'colutils:covert': () => this.covert()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'colutils:upper': () => Covert.upper()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'colutils:lower': () => Covert.lower()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'colutils:md5': () => Covert.md5()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
    this.colutilsView.destroy();
  },

  serialize() {
    return {
      colutilsViewState: this.colutilsView.serialize()
    };
  },

  covert() {
    Covert.covert();
  }

};
