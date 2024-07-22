export type SendMediaRequest = {
	number: string;
	contactId?: string;
	forceSend: boolean;
	verifyContact: boolean;
	linkUrl: string;
	base64?: string;
	extension: string;
	fileName: string;
	caption?: string;
	delayInSeconds?: number;
};
