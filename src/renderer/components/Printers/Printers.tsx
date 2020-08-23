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
    Heading
} from '@chakra-ui/core';

require('./Printers.scss');

const win = require('electron').remote.getCurrentWindow();

const PrinterList = win.webContents.getPrinters();
const defaultPrinter =
    localStorage.getItem('selectedPrinter') ||
    PrinterList.filter((printer: any) => printer.isDefault)[0].name;

export interface Props {
    heading?: string;
}

const Printers: React.FunctionComponent<Props> = ({ heading }) => {
    const [value, setValue] = React.useState(defaultPrinter);

    React.useEffect(() => {
        localStorage.setItem('selectedPrinter', value);
    }, [value]);

    return (
        <div>
            <Heading as="h5" size="sm">
                {heading}
            </Heading>
            <RadioGroup onChange={e => setValue(e.target.value)} value={value} spacing={5}>
                {PrinterList.map((printer: any) => {
                    return (
                        <Radio key={printer.name} variantColor="green" value={printer.name}>
                            {printer.description}
                        </Radio>
                    );
                })}
            </RadioGroup>
        </div>
    );
};

export default Printers;
