import { authClient } from "@/lib/auth-client";
import { Avatar, Dropdown, Header } from "@heroui/react";

interface UserDropdownProps {
  user: {
    email: string;
    image?: string | null;
    name?: string | null;
  };
  logoutFn: () => void;
}

function UserDropdown({ user, logoutFn }: UserDropdownProps) {
  return (
    <div>
      <Dropdown>
        <Dropdown.Trigger>
          <Avatar>
            <Avatar.Image src={user?.image || undefined} />
            <Avatar.Fallback>{user?.name?.charAt(0) || "U"}</Avatar.Fallback>
          </Avatar>
        </Dropdown.Trigger>
        <Dropdown.Popover className={"border"}>
          <Dropdown.Menu>
            <Header>{user?.email}</Header>
            <Dropdown.Section className="border-t border-t-gray-700">
              <Dropdown.Item
                onPress={() => logoutFn()}
                className="hover:bg-danger-soft"
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Section>
          </Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown>
    </div>
  );
}

export default UserDropdown;
