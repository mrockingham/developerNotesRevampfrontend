'use client';
import React, { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import CodeMirror from '@uiw/react-codemirror';
import { Text, Flex, Button, Box, useColorMode } from '@chakra-ui/react';
import NextImage from 'next/image';
import {
  SelectedBackgroundColor,
  SelectedDefaultTextColor,
} from '@/utils/colorSelection';

import { css } from '@codemirror/lang-css';
import { aura } from '@uiw/codemirror-theme-aura';
import { nord } from '@uiw/codemirror-theme-nord';
import { basicDark } from '@uiw/codemirror-theme-basic';

const CssEditor = (props: { setCssValue: any; value: any }) => {
  const pathname = usePathname();
  const { setCssValue, value } = props;
  const { toggleColorMode, colorMode } = useColorMode();
  const [open, setOpen] = useState(true);
  const onChange = useCallback((val, viewUpdate) => {
    setCssValue(val);
    if (pathname != 'home') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('DevErNote-current-notecss', JSON.stringify(val));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cssValue = () => {
    if (typeof window !== 'undefined') {
      const jsonValue = localStorage.getItem('DevErNote-current-notecss');
      return jsonValue != null ? JSON.parse(jsonValue) : '';
    } else return '';
  };
  return (
    <Flex flexDirection="column" width={open ? '100%' : '20%'}>
      <Flex pl={3} pr={10} w="100%" justifyContent="space-between">
        <Text
          fontSize="1.8rem"
          color={SelectedDefaultTextColor().backgroundText}
        >
          CSS
        </Text>
        {pathname !== '/home' && (
          <Button
            display={{ base: 'block', md: 'none' }}
            _hover={{ bg: SelectedDefaultTextColor().foregroundText }}
            variant={'ghost'}
            onClick={() => setOpen(prevOpen => !prevOpen)}
          >
            <NextImage
              alt="arrow"
              src="/vdoublearrow.svg"
              width={30}
              height={30}
            />
          </Button>
        )}
        {pathname !== '/home' && (
          <Button
            display={{ base: 'none', md: 'block' }}
            _hover={{ bg: SelectedDefaultTextColor().foregroundText }}
            variant={'ghost'}
            onClick={() => setOpen(prevOpen => !prevOpen)}
          >
            <NextImage
              alt="arrow"
              src="/hdoublearrow.svg"
              width={30}
              height={30}
            />
          </Button>
        )}
      </Flex>
      <Box
        // borderColor={colorMode === 'light' ? TextColor1() : TextColor2()}
        // style={{
        //   boxShadow: '15px 15px 30px #253544, -15px -15px 30px #31475c',
        // }}
        boxShadow="2xl"
        rounded="md"
      >
        <CodeMirror
          value={pathname != '/home' ? cssValue() : value}
          height="300px"
          extensions={[css()]}
          onChange={onChange}
          theme={nord}
        />
      </Box>
    </Flex>
  );
};

export default CssEditor;
