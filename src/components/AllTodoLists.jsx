import * as Icons from '@mui/icons-material';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';

import { useTodoLists } from '../hooks/useTodoLists.js';
import { useAppState } from '../providers/AppState.jsx';

export function AllTodoLists() {
  const { data } = useTodoLists(); // add loading
  const { currentList, setCurrentList } = useAppState();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!currentList) {
      setCurrentList(data[0]?.id);
    }
  }, [currentList, data, setCurrentList]);

  return (
    <Drawer
      sx={{
        width: 0.2,
        minWidth: 50,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 0.2,
          minWidth: 50,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/*Empty Toolbar for spacing*/}
      <Toolbar />
      <List>
        {data.map(({ name, id, icon }) => {
          const Icon = Icons[icon];
          return (
            <ListItem key={id} disablePadding>
              <ListItemButton
                onClick={() => {
                  setCurrentList(id);
                }}
                selected={currentList === id}
              >
                {Icon ? <Icon /> : null}
                {!isMobile && <ListItemText sx={{ ml: 1.5 }} primary={name} />}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}
