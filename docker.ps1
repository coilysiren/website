docker run -it --mount type=bind,source=$((Get-Location).Path),target=/projects/lynncyrin-dot-me --workdir=/projects/lynncyrin-dot-me lynncyrin/base-image:node bash
