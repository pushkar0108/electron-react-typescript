import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    RadioGroup,
    Radio,
    Button,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    List,
    ListItem,
    ListIcon,
    Divider
} from '@chakra-ui/core';

import CounterContainer from '../containers/CounterContainer';
import Printers from './Printers/Printers';
import PrintJobQueue from './PrintJobQueue/PrintJobQueue';

function PlacementExample() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Tabs variant="soft-rounded" variantColor="green" size="sm">
                <TabList>
                    <Tab>Print Jobs</Tab>
                    <Tab>Available Printers</Tab>
                    <Tab>Counter</Tab>
                    <Tab>Open Drawer</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <PrintJobQueue
                            jobs={[
                                {
                                    name: 'Job 1',
                                    status: 'QUEUED'
                                },
                                {
                                    name: 'Job 2',
                                    status: 'READY'
                                },
                                {
                                    name: 'Job 3',
                                    status: 'PROCESSED'
                                },
                                {
                                    name: 'Job 4',
                                    status: 'SYNCED'
                                }
                            ]}
                            />
                    </TabPanel>
                    <TabPanel>
                        <Printers heading="Select Hardware Printer To Which Prints Will Be Sent" />
                    </TabPanel>
                    <TabPanel>
                        <CounterContainer />
                    </TabPanel>
                    <TabPanel>
                        <Button variantColor="blue" onClick={onOpen}>
                            Open Drawer
                        </Button>
                    </TabPanel>
                </TabPanels>
            </Tabs>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="10px">Basic Drawer</DrawerHeader>
                    <DrawerBody>
                        <List spacing={6}>
                            <ListItem>
                                <ListIcon icon="check-circle" color="green.500" />
                                Print Jobs
                                <Divider />
                            </ListItem>
                            <ListItem>
                                <ListIcon icon="check-circle" color="green.500" />
                                Change Printer Settings
                                <Divider />
                            </ListItem>
                            <ListItem>
                                <ListIcon icon="check-circle" color="green.500" />
                                Account Details
                                <Divider borderColor="blue" />
                            </ListItem>
                            <ListItem>
                                <ListIcon icon="check-circle" color="green.500" />
                                Logout
                                <Divider />
                            </ListItem>
                        </List>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}

const Application = () => (
    <div>
        <PlacementExample />
    </div>
);

export default hot(Application);
