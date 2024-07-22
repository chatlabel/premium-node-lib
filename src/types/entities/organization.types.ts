export type Organization = {
	id: string;
	description: string;
	linkImage: string;
	timeZone: string;
};

export type Sector = {
	id: string;
	name: string;
	organizationId: string;
	serviceTimeRuleId: string;
};

export type Tag = {
	Id: string;
	OrganizationId: string;
	HexColor: string;
	Description: string;
};
