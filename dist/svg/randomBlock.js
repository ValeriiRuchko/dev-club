const randomBlock = (req, res) => {
    const x = Math.floor(Math.random() * 400);
    const y = Math.floor(Math.random() * 400);
    return `<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
      <rect x="${x}" y="${y}" width="50" height="50" fill="blue" />
    </svg>`;
};
export default randomBlock;
//# sourceMappingURL=randomBlock.js.map