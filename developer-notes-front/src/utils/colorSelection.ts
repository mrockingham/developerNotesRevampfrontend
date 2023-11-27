import { useUserStore } from '@/stores/useUserStore';


export const selectedBackgroundColor = () => {
    const { data } = useUserStore(
        (state: any) => state
    );
    let backgroundColor = '';
    if (data?.theme?.gradient) {
        backgroundColor = `linear(to-r, ${data?.theme?.backgroundGradient1}, ${data?.theme?.backgroundGradient2}, ${data?.theme?.backgroundGradient3})`;
    } else if (data?.theme?.gradient === false) {
        backgroundColor = data?.theme?.backgroundSolid;
    } else backgroundColor = 'default.backgroundSolid';
    return backgroundColor;
};
export const selectedDefaultTextColor = () => {
    const { data } = useUserStore(
        (state: any) => state
    );
    let defaultTextColor = {
        backgroundText: '',
        foregroundText: ''
    };
    if (!data?.theme?.backgroundText) {
        defaultTextColor.backgroundText = '#ffffff'
        defaultTextColor.foregroundText = '#893557'

    } else defaultTextColor = {

        backgroundText: data?.theme?.backgroundText,
        foregroundText: data?.theme?.foregroundText,
    }
    return defaultTextColor;
};
