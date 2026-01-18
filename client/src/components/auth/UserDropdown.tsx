import { useAuth } from "@/hooks/useAuth";
import { Avatar, Dropdown, Header } from "@heroui/react";
import React from "react";

function UserDropdown() {
  const { user, logout } = useAuth();
  return (
    <div>
      <Dropdown>
        <Dropdown.Trigger>
          <Avatar>
            <Avatar.Fallback>FA</Avatar.Fallback>
          </Avatar>
        </Dropdown.Trigger>
        <Dropdown.Popover className={"border"}>
          <Dropdown.Menu>
            <Header>{user?.email}</Header>
            <Dropdown.Section>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
            </Dropdown.Section>
            <Dropdown.Section className="border-t border-t-gray-700">
              <Dropdown.Item
                onPress={() => logout()}
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
