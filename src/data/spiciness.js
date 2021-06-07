export function spiciness(){
    const spiciness = Array.from(Array(10).keys()).map((item) => ({
        label: item.toString(),
        value: item.toString()
      }));
      return spiciness;
}