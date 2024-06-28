

export type AccountUser = {
    id: string;
    settings: {

    },
    contactList: string[];
    
}

export type User = {
    id: string;
    profileImage?: string;
    name?: string;
    contact?: string;
    last: {
        date: string;
        messagePreview: string;
        failed?: boolean;
    }
}

export type Conversation = {
    id: string;
    with: string[];
    messages: {date: string; data: Message[]}[]
}

type MessageSuccessCount = 'failed'|'first'|'second'|'final'
type Messagemedia = {type: 'image', source: string[]}|{type: 'video', source: string}|{type: 'audio', source: string}
export type Message = {
    id: string;
    time: string;
    type: 'fowarded'|'reply'|'normal';
    senderId: string;
    successCount: MessageSuccessCount;
    data: {
        repliedMessageId?: string;
        text?: string;
        media?: Messagemedia
    }
}


