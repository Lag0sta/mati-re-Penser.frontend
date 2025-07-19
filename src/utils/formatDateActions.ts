//formatage Date à h-Belge
export  function formatDateToBelgium(dateStr: string | undefined): string {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleString('fr-BE', {
            timeZone: 'Europe/Brussels',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).replace(',', '');
    }