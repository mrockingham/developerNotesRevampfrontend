'use client';
import { Console, Hook, Unhook } from 'console-feed';
import { Message } from 'console-feed/lib/definitions/Component';
import { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';

interface Props {
  logs?: Message[];
  onLog?: (mgs: Message) => void;
}

export const ConsoleFeed: React.FC<Props> = props => {
  const { onLog } = props;
  const [logs, setLogs] = useState<Message[]>([]);

  useEffect(() => {
    const hooked = Hook(
      window.console,
      log => {
        if (onLog) {
          onLog(log as any);
        } else {
          setLogs((currLogs: any) => [...currLogs, log]);
        }
      },
      false
    );

    return () => {
      Unhook(hooked);
    };
  }, [onLog]);

  useEffect(() => {
    const onMessage = (response: MessageEvent<any>) => {
      const data = response.data;
      if (data && data.source === 'jsRunner') {
        switch (data.type) {
          case 'log':
            console.log(...data.message);
            break;
          case 'error':
            if (Array.isArray(data.message)) {
              console.error(...data.message);
            } else {
              console.error(data.message);
            }
        }
      }
    };
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, []);

  const _logs = props.logs || logs;
  // console.log('props logs', _logs);
  return (
    <Box minH="200px">
      <Console
        styles={{
          BASE_FONT_SIZE: '14px',
          BASE_FONT_FAMILY: `Monaco, "Andale Mono", "Ubuntu Mono", monospace`,
        }}
        variant="dark"
        logs={_logs}
      />
    </Box>
  );
};

export type { Message };
