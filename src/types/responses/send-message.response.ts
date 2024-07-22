import { SimpleSuccessResponse } from "@responses/simple-success.response";

export type SendMessageResponse = SimpleSuccessResponse & {
	currentChatId?: string;
	messageSentId?: string;
	messagesSentIds?: Array<string>;
};
