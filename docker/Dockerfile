FROM mcr.microsoft.com/playwright:v1.49.1-jammy

ENV PATH="/opt/porsche-design-system/bin:${PATH}"

RUN apt-get update && \
    apt-get install -yq gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 \
    libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 \
    libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 \
    libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 \
    ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils libnotify-dev \
    libgtk2.0-0 xvfb openssh-client procps git curl unzip build-essential rclone && \
    rm -rf /var/lib/apt/lists/*

COPY ./entrypoint.sh "/opt/porsche-design-system/entrypoint.sh"
COPY ./bin "/opt/porsche-design-system/bin"
COPY ./shared "/opt/porsche-design-system/shared"

# to fix JavaScript heap out of memory exceptions
# https://github.com/actions/runner-images/issues/70#issuecomment-1191708172
ENV NODE_OPTIONS="--max_old_space_size=4096"

ENTRYPOINT [ "/opt/porsche-design-system/entrypoint.sh" ]
