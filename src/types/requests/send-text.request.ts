export type SendTextRequest = {
	number: string;
	contactId?: string;
	message: string;
	isWhisper?: boolean;
	forceSend: boolean;
	verifyContact: boolean;
	delayInSeconds?: number;
};
