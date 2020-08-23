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
    Divider
} from '@chakra-ui/core';

import PrintJobView from '../PrintJobView/PrintJobView';

require('./PrintJobQueue.scss');
const ipc = require('electron').ipcRenderer;

export interface Props {
    heading?: string;
    jobs?: any;
}

const PrintJobQueue: React.FunctionComponent<Props> = ({ jobs }) => {
    const [selectedJob, setJob] = React.useState(jobs[0]);

    return (
        <div>
            <Flex align="center" size="100%">
                <Flex bg="green.50" size="200px" align="flex-start" justify="center">
                    <List spacing={4}>
                        {jobs.map((job: any) => {
                            const isSelected = selectedJob.name === job.name;
                            return (
                                <ListItem
                                    className={isSelected ? 'active' : ''}
                                    key={job.name}
                                    onClick={e => setJob(job)}>
                                    {job.name}
                                </ListItem>
                            );
                        })}
                    </List>
                </Flex>
                <Flex bg="blue.50" size="100%" align="center" justify="center" direction="column">
                    <PrintJobView job={selectedJob} />
                </Flex>
            </Flex>
        </div>
    );
};

export default PrintJobQueue;
