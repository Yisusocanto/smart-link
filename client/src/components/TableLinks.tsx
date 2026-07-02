"use client";

import { BACKEND_URL } from "@/constants/backURL";
import { useDeleteLink, useToggleLinkStatus } from "@/hooks/useLink";
import { Link as LinkType } from "@/types/Link";
import { Button, Chip, Switch, Table } from "@heroui/react";
import { Check, Power, SquareArrowUpRight, Trash } from "lucide-react";
import Link from "next/link";

interface TableLinksProps {
	links: LinkType[];
}

function TableLinks({ links }: TableLinksProps) {
	const { mutate: deleteLink, isPending: isDeleting } = useDeleteLink();

	const { mutate: toggleLinkStatus, isPending: isToggling } =
		useToggleLinkStatus();
	return (
		<Table>
			<Table.ScrollContainer>
				<Table.Content aria-label="Links table">
					<Table.Header>
						<Table.Column isRowHeader>Original URL</Table.Column>
						<Table.Column>Short Link</Table.Column>
						<Table.Column>Clicks</Table.Column>
						<Table.Column>Actions</Table.Column>
					</Table.Header>
					<Table.Body>
						{links.map((link) => {
							return (
								<Table.Row key={link._id}>
									<Table.Cell className={"font-bold max-w-xs truncate"}>
										{link.originalURL}
									</Table.Cell>
									<Table.Cell>
										<Chip
											variant="soft"
											color="accent"
											className="w-fit p-1 border text-base hover:bg-accent/20 flex gap-2 items-center">
											<Link
												href={`${BACKEND_URL}/${link.alias}`}
												target="_blank">{`${BACKEND_URL}/${link.alias}`}</Link>
											<SquareArrowUpRight size={14} />
										</Chip>
									</Table.Cell>
									<Table.Cell className={"text-base font-bold"}>
										{link.clickCount}
									</Table.Cell>
									<Table.Cell className={"flex flex-row gap-2"}>
										<Switch
											size="lg"
											isSelected={link.active}
											onChange={() => toggleLinkStatus(link.alias)}
											isDisabled={isToggling}>
											<Switch.Control>
												<Switch.Thumb>
													<Switch.Icon>
														{link.active ? (
															<Check className="p-1 stroke-3" />
														) : (
															<Power className="p-1 stroke-3" />
														)}
													</Switch.Icon>
												</Switch.Thumb>
											</Switch.Control>
										</Switch>
										<Button
											className={"border"}
											variant="danger-soft"
											isIconOnly
											onPress={() => deleteLink(link.alias)}
											isDisabled={isDeleting}>
											<Trash />
										</Button>
									</Table.Cell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table.Content>
			</Table.ScrollContainer>
		</Table>
	);
}

export default TableLinks;
