import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<{ _id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const fetchSuggestions = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }

    


    setIsLoading(true);
    try {
      const response = await fetch(`https://spareparts-backend.vercel.app/api/products?search=${searchTerm}`);
      if (!response.ok) throw new Error('Failed to fetch suggestions');
      const data = await response.json();
      // Ensure `data` is an array of objects and extract relevant fields
      setSuggestions(data.map((product: any) => ({ _id: product._id, name: product.name })));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchInput = (text: string) => {
    setQuery(text);

    if (!text.trim()) {
      setSuggestions([]); // Clear suggestions when search query is empty
      return;
    }

    // Debounce logic
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      fetchSuggestions(text);
    }, 300); // Debounce delay
    setDebounceTimer(timer);
  };

  const handleSearchItemPress = (term: string) => {
    setQuery(term);
    fetchSuggestions(term);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        placeholder="Search for products..."
        onChangeText={handleSearchInput}
      />
      {isLoading ? (
        <ActivityIndicator size="small" color="#6200EE" />
      ) : (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleSearchItemPress(item.name)}
            >
              <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              {query ? 'No suggestions found.' : 'Start typing to search.'}
            </Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F9F9F9' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FFF',
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: { fontSize: 16, color: '#333' },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 16 },
});

export default SearchScreen;
