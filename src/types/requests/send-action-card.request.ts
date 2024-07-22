export type SendActionCardRequest = {
	number?: string;
	contactId?: string;
	action_card_id: string;
	forceSend: boolean;
	verifyContact: boolean;
};
