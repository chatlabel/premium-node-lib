import { SimpleSuccessResponse } from "@responses/simple-success.response";

export type CreateChatResponse = SimpleSuccessResponse & {
	chatId: string;
	contactId: string;
};
