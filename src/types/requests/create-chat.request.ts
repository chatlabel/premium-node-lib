import { SendTemplateComponent } from "@requests/send-template.request";

export type CreateChatRequest = {
	number?: string;
	contactId?: string;
	message?: string;
	quickAnswerId?: string;
	quickAnswerComponents?: Array<SendTemplateComponent>;
	sectorId?: string;
	userId?: string;
};
