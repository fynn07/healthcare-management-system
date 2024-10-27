export function formatData(item) {
    const fullName = `${item.first_name} ${item.middle_name ? item.middle_name + ' ' : ''}${item.last_name}`;
    
    const gender = item.gender === 'M' ? 'Male' : item.gender === 'F' ? 'Female' : 'N/A';
    
    const formattedBirthday = item.birthday ? new Date(item.birthday).toLocaleDateString('en-US') : 'N/A';

    return {
        fullName,
        gender,
        formattedBirthday,
    };
}