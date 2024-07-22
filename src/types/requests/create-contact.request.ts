import { Tag } from "@entities/organization.types";

export type CreateContactRequest = {
	nickName?: string;
	base64Image?: string;
	externalLinkImage?: string;
	imageExtension?: string;
	fidelity?: {
		fidelized?: boolean;
		sectorId: string;
		userId?: string;
		sendToSectorIfUserOffline?: boolean;
	};
	email?: string;
	number: string;
	observation?: string;
	tags?: Array<Tag>;
	updateIfExists?: boolean;
};
