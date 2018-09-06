import Component, { tracked } from '@glimmer/component';

export default class UserInput extends Component {
    @tracked inputActive = false
    @tracked message: string;

    _handleEmojiPicked(emoji) {
        this.args.onSubmit({
            author: 'me',
            type: 'emoji',
            data: { emoji }
        })
    }

    _submitText(e) {
        const text = e.target.value.trim();
        if (text && text.length > 0) {
            this.args.onSubmit({
                author: 'me',
                type: 'text',
                data: { text }
            });
            e.target.value = ''
        }
    }

    sendIconHandler(e) {
        e.preventDefault();
        console.log(e)
        debugger
        const _message = this.message
        if(_message) {
            this.args.onSubmit({
                author: 'me',
                type: 'text',
                data: { _message }
            });

        }
    }

    handleKey(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault()
            this._submitText(e);
        }

    }

    setActive() {
        this.inputActive = true
    }

    unsetActive() {
        this.inputActive = false
    }

}
