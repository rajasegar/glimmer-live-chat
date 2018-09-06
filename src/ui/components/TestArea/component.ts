import Component from '@glimmer/component';

export default class TestArea extends Component {
    handleSubmit(e) {
        e.preventDefault();
        let _text = e.target[0].value

        // call the action passed via props
        this.args.onMessage(_text);
        // clear the textarea
        e.target.reset();

    }
}
