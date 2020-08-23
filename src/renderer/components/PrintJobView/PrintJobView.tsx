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
    RadioButtonGroup,
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
    Heading,
    Flex,
    Box,
    Text,
    Divider,
    Skeleton,
    FormControl,
    FormLabel,
    Input,
    FormHelperText
} from '@chakra-ui/core';

require('./PrintJobView.scss');
const ipc = require('electron').ipcRenderer;

export interface Props {
    job: any;
}

const PrintJobView: React.FunctionComponent<Props> = ({ job }) => {
    return (
        <div>
            Job name - {job.name}
            <FormControl>
                <FormLabel htmlFor="phone">Enter Customer Phone Number</FormLabel>
                <Input type="phone" id="phone" />
            </FormControl>
            <Divider />
            {job.status === 'QUEUED' ? (
                <div>
                    Please wait while we process your request
                    <Skeleton height="20px" my="10px" />
                    <Skeleton height="20px" my="10px" />
                    <Skeleton height="20px" my="10px" />
                </div>
            ) : (
                <Flex bg="blue.50" size="100%" align="center" justify="center" direction="column">
                    <Button
                        variantColor="blue"
                        size="sm"
                        onClick={() => {
                            ipc.send('message', localStorage.getItem('selectedPrinter'));
                        }}>
                        Print Paper Receipt
                    </Button>
                    <Button
                        variantColor="green"
                        size="sm"
                        onClick={() => {
                            ipc.send('message', localStorage.getItem('selectedPrinter'));
                        }}>
                        Send Invoiz Receipt
                    </Button>
                    <Button
                        variantColor="green"
                        size="sm"
                        onClick={() => {
                            ipc.send('message', localStorage.getItem('selectedPrinter'));
                        }}>
                        Print Paper + Send Invoiz Receipt
                    </Button>
                    <Button
                        variantColor="gray"
                        size="sm"
                        onClick={() => {
                            ipc.send('message', localStorage.getItem('selectedPrinter'));
                        }}>
                        Cancel
                    </Button>
                </Flex>
            )}
        </div>
    );
};

export default PrintJobView;
