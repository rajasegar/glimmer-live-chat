import Component, { tracked } from '@glimmer/component';

export default class EmojiIcon extends Component {
    @tracked isActive = false
    openPicker(e) {
        e.preventDefault();
        this.isActive = !this.isActive;
    }

    sendAndClosePicker(e) {
        this.isActive = false
        this.args.onEmojiPicked(e)
    }
}
