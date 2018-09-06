import Component, { tracked } from '@glimmer/component';
import messageHistory from './messageHistory';

export default class GlimmerWidget extends Component {
    agentProfile = {
        teamName: 'glimmer-live-chat',
        imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
    }

    @tracked messageList =  messageHistory
    @tracked isOpen = false

    @tracked newMessagesCount = 0

    sendMessage(text) {
        if(text.length > 0) {
            const _newMessagesCount = this.isOpen ? this.newMessagesCount : this.newMessagesCount + 1
            this.newMessagesCount = _newMessagesCount
            this.messageList = [...this.messageList, {author: 'them', type: 'text', data: { text }}]
        }
    }

    toggleLauncher() {
        this.isOpen = !this.isOpen
        this.newMessagesCount = 0
    }

    _onMessageWasSent(message) {
        this.messageList = [...this.messageList, message]
    }

}
