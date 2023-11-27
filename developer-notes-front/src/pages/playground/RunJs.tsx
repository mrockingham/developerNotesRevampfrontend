export type JsRunnerEnv<T = HTMLIFrameElement | Worker> = {
  current: T | undefined;
};

export const runJS = (
  code: string,
  type: 'iframe' | 'webWorker',
  ref?: JsRunnerEnv<HTMLIFrameElement | Worker>
) => {
  type === 'iframe'
    ? iframeRunner(code, ref as any)
    : webWorkerRunner(code, ref as any);
};

const webWorkerRunner = (code: string, ref?: JsRunnerEnv<Worker>) => {
  const js = `
        console.log = function (...rest) {
          self.postMessage(
            {
              source: "jsRunner",
              type: "log",
              message: rest,
            }
          );
        };
        console.error = function (...rest) {
          self.postMessage(
            {
              source: "jsRunner",
              type: "error",
              message: rest,
            },
          );
        };
        self.addEventListener("error", (e) => {
          self.postMessage(
            {
              source: "jsRunner",
              type: "error",
              message: e.message,
            }
          );
        });    
        ${code}
      `;
  const blob = new Blob([js], {
    type: 'text/javascript',
  });
  // Note: window.webkitURL.createObjectURL() in Chrome 10+.
  ref?.current?.terminate();
  const worker = new Worker(window.URL.createObjectURL(blob));
  if (ref) {
    ref.current = worker;
  }
  worker.onmessage = e => {
    window.dispatchEvent(new MessageEvent('message', { data: e.data }));
  };
};

const iframeRunner = (code: string, ref?: JsRunnerEnv<HTMLIFrameElement>) => {
  const html = `
        <body>
          <script>
            console.log = function (...rest) {
              window.parent.postMessage(
                {
                  source: "jsRunner",
                  type: "log",
                  message: rest,
                },
                "*"
              );
            };
            console.error = function (...rest) {
              window.parent.postMessage(
                {
                  source: "jsRunner",
                  type: "error",
                  message: rest,
                },
                "*"
              );
            };
            window.addEventListener("error", (e) => {
              window.parent.postMessage(
                {
                  source: "jsRunner",
                  type: "error",
                  message: e.message,
                },
                "*"
              );
            });
          </script>
          <script>
            ${code}
          </script>
        </body>
        `;

  ref?.current && document.body.removeChild(ref.current);
  const iframe = document.createElement('iframe');
  if (ref) {
    ref.current = iframe;
  }
  iframe.classList.add('js-code-runner');
  iframe.srcdoc = html;
  document.body.appendChild(iframe);
};
