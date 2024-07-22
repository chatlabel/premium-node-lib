import { Attribute } from "@entities/attribute.type";
import { Tag } from "@entities/organization.types";

export type Contact = {
	id?: string;
	genericAttributes?: Array<Attribute>;
	nickName?: string;
	fidelizations?: Array<Fidelization>;
	email?: string;
	number?: string;
	observation?: string;
	organizations?: Array<string>;
	tags?: Array<Tag>;
	name?: string;
	nameFromWhatsApp?: string;
	linkImage?: string;
	curChatId?: string;
	curChatCollection?: Array<string>;
	hasInteraction?: boolean;
	onlyScriptEvent?: boolean;
	dhRegister?: Date;
};

export type Fidelization = {
	organizationId: string;
	fidelized: boolean;
	sectorId: string;
	userId: string;
	sendToSectorIfUserOffline: boolean;
};
