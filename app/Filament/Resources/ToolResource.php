<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ToolResource\Pages;
use App\Models\Tool;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ToolResource extends Resource
{
    protected static ?string $model = Tool::class;

    protected static ?string $navigationIcon = 'heroicon-o-wrench-screwdriver';

    protected static ?string $navigationGroup = 'Tool Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (Forms\Set $set, ?string $state) => $set('slug', \Illuminate\Support\Str::slug($state))),

                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->unique(ignoreRecord: true),

                Forms\Components\Section::make('Form Builder')
                    ->description('Define the inputs required for this tool.')
                    ->schema([
                        Forms\Components\Repeater::make('form_schema')
                            ->label('Input Fields')
                            ->schema([
                                Forms\Components\TextInput::make('label')
                                    ->required()
                                    ->label('Input Label'),
                                Forms\Components\TextInput::make('variable')
                                    ->required()
                                    ->label('Variable Name')
                                    ->helperText('Use this in the template as {{variable}}'),
                                Forms\Components\Select::make('type')
                                    ->options([
                                        'text' => 'Text Input',
                                        'number' => 'Number',
                                        'ip' => 'IP Address',
                                        'select' => 'Select Dropdown', // Could expand to support options
                                    ])
                                    ->required(),
                                Forms\Components\TextInput::make('default')
                                    ->label('Default Value'),
                            ])
                            ->columns(4),
                    ]),

                Forms\Components\Section::make('Script Template')
                    ->schema([
                        Forms\Components\Textarea::make('script_template')
                            ->label('RouterOS Script Template')
                            ->rows(10)
                            ->helperText('Use {{variable}} syntax. Supports basic logic handled by frontend engine.')
                            ->required(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('slug'),
                Tables\Columns\TextColumn::make('updated_at')->dateTime(),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTools::route('/'),
            'create' => Pages\CreateTool::route('/create'),
            'edit' => Pages\EditTool::route('/{record}/edit'),
        ];
    }
}
